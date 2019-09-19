package com.github.wangfeng.iadmin.dao;

import static org.junit.Assert.*;

import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserRoleRelDTO;
import com.github.wangfeng.iadmin.common.po.dto.AdminSysUserRoleRelWithPageDTO;
import com.github.wangfeng.iadmin.common.po.dto.UserWithRoleQueryDTO;
import com.github.wangfeng.iadmin.common.po.entity.AdminSysUserDO;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class AdminSysUserRoleRelMapperTest {

    @Autowired
    private AdminSysUserRoleRelMapper adminSysUserRoleRelMapper;

    @Test
    public void testListRoleOwners() {
        UserWithRoleQueryDTO queryDO = new UserWithRoleQueryDTO();
        queryDO.setNickName("ddd");
        queryDO.setLoginName("dafds");
        queryDO.setPageSize(10);
        queryDO.setPageNumber(1);
        List<AdminSysUserRoleRelDTO> adminSysUserDOS = adminSysUserRoleRelMapper.selectRoleOwners(queryDO);
        System.out.println(adminSysUserDOS);
    }
}