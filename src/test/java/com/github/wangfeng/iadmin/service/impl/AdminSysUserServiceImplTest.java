package com.github.wangfeng.iadmin.service.impl;

import com.github.pagehelper.PageInfo;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserDTO;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserQueryWithPageDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;
import com.github.wangfeng.iadmin.service.AdminSysUserService;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class AdminSysUserServiceImplTest {

    @Autowired
    private AdminSysUserService adminSysUserService;

    @Test
    public void test() {
        AdminSysUserQueryWithPageDTO adminSysUserDTO = new AdminSysUserQueryWithPageDTO();
        //adminSysUserDTO.setPageNumber(1);
        //adminSysUserDTO.setPageSize(2);
        PageInfo<AdminSysUserDO> userListPage = adminSysUserService.findUserListPage(adminSysUserDTO);
    }

}