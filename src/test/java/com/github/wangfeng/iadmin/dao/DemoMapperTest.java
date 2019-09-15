package com.github.wangfeng.iadmin.dao;

import com.github.wangfeng.iadmin.common.po.entity.DemoDO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class DemoMapperTest {

    @Autowired
    private DemoMapper demoMapper;

    @Test
    public void testInsert() {
        DemoDO insertDO = new DemoDO();
        insertDO.setPassword("1234");
        insertDO.setUserName("demo_1234");
        int insert = demoMapper.insert(insertDO);
        System.out.println(insert);
        System.out.println(insertDO.getId());
        List<DemoDO> list = demoMapper.selectAll();
        System.out.println(list);


    }

}