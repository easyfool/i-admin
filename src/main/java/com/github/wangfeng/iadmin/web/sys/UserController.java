package com.github.wangfeng.iadmin.web.sys;

import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserDTO;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserQueryDTO;
import com.github.wangfeng.iadmin.common.po.dto.BootstrapTableResultDTO;
import com.github.wangfeng.iadmin.common.response.ResponseResult;
import java.util.Arrays;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/sys/admin/user")
@Slf4j
public class UserController {

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String userManageHomePage() {
        return "views/sys/user/list";
    }

    @RequestMapping(value = "/listUsers", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult listUsers(@RequestBody AdminSysUserQueryDTO adminSysUserQueryDTO) {
        List<AdminSysUserDTO> userList = getUserList();
        BootstrapTableResultDTO<AdminSysUserDTO> resultTableData = new BootstrapTableResultDTO<>();
        resultTableData.setRows(userList);
        resultTableData.setTotal(Long.valueOf(userList.size()));

        ResponseResult responseResult = new ResponseResult();
        responseResult.setContent(resultTableData);
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }

    private List<AdminSysUserDTO> getUserList() {

        AdminSysUserDTO user = new AdminSysUserDTO();
        user.setId(1L);
        user.setLoginName("admin");

        AdminSysUserDTO user2 = new AdminSysUserDTO();
        user2.setId(2L);
        user2.setLoginName("wangfeng");

        return Arrays.asList(user, user2);
    }

    public ResponseResult addUser() {
        return null;
    }

    public ResponseResult disableUser() {
        return null;
    }

    public ResponseResult removeUser() {
        return null;
    }

    public ResponseResult lockUser() {
        return null;
    }


    public ResponseResult unlockUser() {
        return null;
    }


}
