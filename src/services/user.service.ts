import axios from "@/utils/axios";
import Message from "@/components/Message/index";

interface UserPermissionResponse {
  permissionItems: permissionItem[];
  userItems: userItem;
  roleItems: roleItem[];
}

class permissionItem {
  PermissionSort = 0;
  PermissionUrl = "";
  PermissionType = "PAGE";
  PermissionMethod = "GET";
  PermissionClass = "";
  PermissionName = "unnamed permission";
  PermissionId = -1;
}

class userItem {
  available = true;
  userId = -1;
  email = "";
  username = "undefined";
}

class roleItem {
  roleId = -1;
  roleName = "unnamed role";
  roleDescription = "";
}

class UserService {
  getUserPermission = async () => {
    try {
      const response = await axios.get<UserPermissionResponse>(
        "user/permission"
      );
      const permissions = response.data.permissionItems;
      const user = response.data.userItems;
      const roles = response.data.roleItems;
      localStorage.setItem("user", user.toString());
      localStorage.setItem("roles", roles.toString());
      localStorage.setItem("permissions", permissions.toString());
    } catch (e) {
      Message.error("Something Wrong when get user infomation+", e);
    }
  };
}
