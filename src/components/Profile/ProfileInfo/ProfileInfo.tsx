import s from "./ProfileInfo.module.scss";
import { Preloader } from "../../common/preloader/Preloader";
import { ProfileStatus } from "./ProfileStatus";
import { ProfilePropsType } from "../Profile";

const ProfileInfo = (props: ProfilePropsType) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" />
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.small} />
        <ProfileStatus
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
