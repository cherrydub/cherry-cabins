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

  function handleUpdate(e, field, settingLabel, currentValue) {
    const { value } = e.target;

    if (!value) return;

    updateSetting(
      { [field]: value },
      {
        onSuccess: (data) => {
          const updatedValue = data[field];
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
            handleUpdate(
              e,
              "minBookingLength",
              "Minimum nights/booking",
              minBookingLength
            )
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
            handleUpdate(
              e,
              "maxBookingLength",
              "Maximum nights/booking",
              maxBookingLength
            )
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
            handleUpdate(
              e,
              "maxGuestsPerBooking",
              "Maximum guests/booking",
              maxGuestsPerBooking
            )
          }
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) =>
            handleUpdate(e, "breakfastPrice", "Breakfast price", breakfastPrice)
          }
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
