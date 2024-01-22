import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be loaded");
  }

  return data;
}

export async function createEditCabin(cabinObj, id) {
  const hasImagePath = cabinObj.image?.startsWith?.(supabaseUrl);
  const imageName = `${crypto.randomUUID()}-${cabinObj.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? cabinObj.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. create/edit cabin
  let query = supabase.from("cabins");

  //1A. CREATE
  if (!id) query = query.insert([{ ...cabinObj, image: imagePath }]);

  //1B. EDIT
  if (id)
    query = query
      .update({ ...cabinObj, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be created");
  }

  //2. upload image
  //unless there is an image

  if (hasImagePath) return data;

  const { data: storageData, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinObj.image);

  //3. delete cabin if there was an error uploading image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, and cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins cannot be deleted");
  }

  return data;
}
