package com.github.wangfeng.iadmin.web.sys;

import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserDTO;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserQueryWithPageDTO;
import com.github.wangfeng.iadmin.common.po.dto.BootstrapTableResultDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;
import com.github.wangfeng.iadmin.common.response.ResponseResult;
import com.github.wangfeng.iadmin.service.AdminSysUserService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.ListUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/sys/admin/user")
@Slf4j
public class UserController {

    @Autowired
    private AdminSysUserService adminSysUserService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String userManageHomePage() {
        return "views/sys/user/list";
    }

    @RequestMapping(value = "/listUsers", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult listUsers(@RequestBody AdminSysUserQueryWithPageDTO adminSysUserQueryWithPageDTO) {
        PageInfo<AdminSysUserDO> userListPage = adminSysUserService.findUserListPage(adminSysUserQueryWithPageDTO);

        BootstrapTableResultDTO<AdminSysUserDTO> resultTableData = new BootstrapTableResultDTO<>();
        resultTableData.setRows(buildUserDTOList(userListPage.getList()));
        resultTableData.setTotal(userListPage.getTotal());

        ResponseResult responseResult = new ResponseResult();
        responseResult.setContent(resultTableData);
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }

    private List<AdminSysUserDTO> buildUserDTOList(List<AdminSysUserDO> list) {
        List<AdminSysUserDTO> resultList = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(list)) {
            resultList = list.stream().map(model -> {
                AdminSysUserDTO adminSysUserDTO = new AdminSysUserDTO();
                BeanUtils.copyProperties(model, adminSysUserDTO);
                return adminSysUserDTO;
            }).collect(Collectors.toList());


        }
        return ListUtils.emptyIfNull(resultList);
    }


    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult addUser(@RequestBody AdminSysUserDO adminSysUserDO) {

        adminSysUserService.addUser(adminSysUserDO);
        ResponseResult responseResult = new ResponseResult();
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult updateUser(@RequestBody AdminSysUserDO adminSysUserDO) {
        adminSysUserService.updateUser(adminSysUserDO);
        ResponseResult responseResult = new ResponseResult();
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
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
