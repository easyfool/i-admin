package com.github.wangfeng.iadmin.web.sys;

import com.github.wangfeng.iadmin.common.po.entity.AdminSysDictDO;
import com.github.wangfeng.iadmin.common.response.ResponseResult;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.ListUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 数据字典 controller
 */
@Controller
@RequestMapping("/sys/dict")
@Slf4j
public class DictController {

    /**
     * 获取性别字典列表数据
     * @return
     */
    @RequestMapping(value = "/sex", method = RequestMethod.GET)
    @ResponseBody
    public ResponseResult<List<AdminSysDictDO>> getSexList() {
        List<AdminSysDictDO> list = new ArrayList<>();
        AdminSysDictDO female = new AdminSysDictDO();
        female.setDictCode("1");
        female.setDictLabel("男");
        list.add(female);
        AdminSysDictDO male = new AdminSysDictDO();
        male.setDictCode("2");
        male.setDictLabel("女");
        list.add(male);
        ResponseResult responseResult = new ResponseResult();
        responseResult.setSuccess(Boolean.TRUE);
        responseResult.setContent(list);
        return responseResult;
    }


}
