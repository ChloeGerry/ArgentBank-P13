import { InputEnum } from "@/components/Input/type";
import { Profile } from "@/actions/type.profile";

export const editProfileInputInformations = (profile: Profile | null) => {
  return [
    {
      label: "firstName",
      type: InputEnum.TEXT,
      placeholder: profile?.firstName,
    },
    {
      label: "lastName",
      type: InputEnum.TEXT,
      placeholder: profile?.lastName,
    },
  ];
};
