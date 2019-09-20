package com.github.wangfeng.iadmin.web.sys;

import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.po.dto.*;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysRoleDO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;
import com.github.wangfeng.iadmin.common.response.ResponseResult;
import com.github.wangfeng.iadmin.service.AdminSysRoleService;

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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/sys/admin/role")
@Slf4j
public class RoleController {

    @Autowired
    private AdminSysRoleService adminSysRoleService;

    @Autowired
    private AdminSysUserRoleRelService adminSysUserRoleRelService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String roleManageHomePage() {
        return "views/sys/role/list";
    }

    /**
     * 为角色添加用户
     *
     * @return
     */
    @RequestMapping(value = "/addUsers", method = RequestMethod.GET)
    public String addUsersToRolePage(@RequestParam("roleId") Long roleId, Model model) {
        model.addAttribute("roleId", roleId);
        return "views/sys/role/addUsers";
    }

    @RequestMapping(value = "/listRoles", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult listRoles(@RequestBody AdminSysRoleQueryWithPageDTO adminSysRoleQueryWithPageDTO) {
        log.debug("查询角色列表，模糊查询，查询条件字段{}.", adminSysRoleQueryWithPageDTO);
        PageInfo<AdminSysRoleDO> roleListPage = adminSysRoleService.findListPage(adminSysRoleQueryWithPageDTO);

        BootstrapTableResultDTO<AdminSysRoleDTO> resultTableData = new BootstrapTableResultDTO<>();
        resultTableData.setRows(buildRoleDTOList(roleListPage.getList()));
        resultTableData.setTotal(roleListPage.getTotal());

        ResponseResult responseResult = new ResponseResult();
        responseResult.setContent(resultTableData);
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult addRole(@RequestBody AdminSysRoleDO newRole) {
        adminSysRoleService.addRole(newRole);
        ResponseResult responseResult = new ResponseResult();
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult updateRole(@RequestBody AdminSysRoleDO updateRole) {
        adminSysRoleService.updateRole(updateRole);
        ResponseResult responseResult = new ResponseResult();
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }

    @RequestMapping(value = "/delete/{roleId}", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult updateRole(@PathVariable Long roleId) {
        adminSysRoleService.deleteRole(roleId);
        ResponseResult responseResult = new ResponseResult();
        responseResult.setSuccess(Boolean.TRUE);
        return responseResult;
    }

    /**
     * 校验角色代码是否存在
     *
     * @return
     */
    @RequestMapping(value = "/isRoleCodeUnique")
    @ResponseBody
    public BootstrapValidatorAjaxResultDTO isRoleCodeUnique(String roleCode) {
        long total = adminSysRoleService.countByRoleCode(roleCode);
        BootstrapValidatorAjaxResultDTO resultDTO = new BootstrapValidatorAjaxResultDTO();

        if (total > 0) {
            resultDTO.setValid(Boolean.FALSE);
        } else {
            resultDTO.setValid(Boolean.TRUE);
        }

        return resultDTO;


    }

    /**
     * 校验角色名称是否存在
     *
     * @return
     */
    @RequestMapping(value = "/isRoleNameUnique")
    @ResponseBody
    public BootstrapValidatorAjaxResultDTO isRoleNameUnique(String roleName) {
        long total = adminSysRoleService.countByRoleName(roleName);
        BootstrapValidatorAjaxResultDTO resultDTO = new BootstrapValidatorAjaxResultDTO();

        if (total > 0) {
            resultDTO.setValid(Boolean.FALSE);
        } else {
            resultDTO.setValid(Boolean.TRUE);
        }

        return resultDTO;

    }

    /**
     * 为角色增加用户
     * @return
     */
    @RequestMapping(value = "/{roleId}/addUsers", method = RequestMethod.POST)
    @ResponseBody
    public ResponseResult addUsersToRole(@PathVariable Long roleId, @RequestBody IdsDTO userIds) {
        adminSysRoleService.batchAddUsersToRole(roleId, userIds.getIds());
        return ResponseResult.simpleSuccessResponse();
    }


    /**
     * 解除授权
     * @return
     */
    @RequestMapping(value = "/auAuthorize/{userRoleRelId}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseResult auAuthorize(@PathVariable Long userRoleRelId) {
        adminSysUserRoleRelService.remove(userRoleRelId);
        ResponseResult responseResult = ResponseResult.simpleSuccessResponse();
        return responseResult;
    }


    private List<AdminSysRoleDTO> buildRoleDTOList(List<AdminSysRoleDO> list) {
        List<AdminSysRoleDTO> resultList = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(list)) {
            resultList = list.stream().map(model -> {
                AdminSysRoleDTO adminSysRoleDTO = new AdminSysRoleDTO();
                BeanUtils.copyProperties(model, adminSysRoleDTO);
                return adminSysRoleDTO;
            }).collect(Collectors.toList());


        }
        return ListUtils.emptyIfNull(resultList);
    }
}
