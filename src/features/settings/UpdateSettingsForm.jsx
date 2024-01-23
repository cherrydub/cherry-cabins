import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";
import { toast } from "sonner";

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, field, settingLabel) {
    const { value } = e.target;

    if (!value) return;

    //this allows to get a somewhat reference value of field, but as the variable name above
    const currentValue = eval(field);

    updateSetting(
      { [field]: value },
      {
        onSuccess: (data) => {
          const updatedValue = Object.values(data)[0];
          toast.info(
            `${settingLabel} updated from ${currentValue} to ${updatedValue}`
          );
        },
      }
    );

    console.log("UpdateSettingForm.jsx", settingLabel);
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) =>
            handleUpdate(e, "minBookingLength", "Minimum nights/booking")
          }
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) =>
            handleUpdate(e, "maxBookingLength", "Maximum nights/booking")
          }
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) =>
            handleUpdate(e, "maxGuestsPerBooking", "Maximum guests/booking")
          }
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice", "Breakfast price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
