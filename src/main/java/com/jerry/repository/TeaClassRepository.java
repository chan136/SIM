package com.jerry.repository;

import com.jerry.pojo.TeaClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface TeaClassRepository extends JpaRepository<TeaClass, Integer>, JpaSpecificationExecutor<TeaClass> {

    TeaClass findTeaClassByTeaNoAndClassNo(String teaNo,String classNo);

}
