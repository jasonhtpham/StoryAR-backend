import storyArBaseRoute from "./storyArRoute/storyArBaseRoute";
import UserBaseRoute from "./userRoute/userBaseRoute";
import AdminBaseRoute from "./adminRoute/adminBaseRoute";
import UploadBaseRoute from "./uploadRoute/uploadBaseRoute";

const Routes = [].concat(storyArBaseRoute, UserBaseRoute, AdminBaseRoute, UploadBaseRoute);

export default Routes;
