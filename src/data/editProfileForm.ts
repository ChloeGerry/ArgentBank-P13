import { InputEnum } from "@/components/Input/type";
import { Profile } from "@/actions/type.profile";

type EditProfileType = {
  label: string;
  type: InputEnum;
  placeholder?: string;
};

export const editProfileForm = (profile: Profile | null): EditProfileType[] => {
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
