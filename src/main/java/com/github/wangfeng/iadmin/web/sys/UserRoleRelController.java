package com.github.wangfeng.iadmin.web.sys;


import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserDTO;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserRoleRelDTO;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserRoleRelWithPageDTO;
import com.github.wangfeng.iadmin.common.po.dto.BootstrapTableResultDTO;
import com.github.wangfeng.iadmin.common.po.dto.UserWithRoleQueryDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;
import com.github.wangfeng.iadmin.common.response.ResponseResult;
import com.github.wangfeng.iadmin.service.AdminSysUserRoleRelService;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.ListUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/sys/admin/userRoleRel")
@Slf4j
public class UserRoleRelController {

    @Autowired
    private AdminSysUserRoleRelService adminSysUserRoleRelService;

    /**
     * 查询拥有角色** 的所有用户
     * @return
     */
    @RequestMapping(value = "/listRoleOwners/{roleId}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult listRoleOwners(@PathVariable Long roleId, @RequestBody UserWithRoleQueryDTO userWithRoleQueryDTO) {
        userWithRoleQueryDTO.setRoleId(roleId);
        PageInfo<AdminSysUserRoleRelDTO> userListPage = adminSysUserRoleRelService
                .findRoleOwners(userWithRoleQueryDTO);

        BootstrapTableResultDTO<AdminSysUserRoleRelDTO> resultTableData = new BootstrapTableResultDTO<>();
        resultTableData.setRows(userListPage.getList());
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


}
