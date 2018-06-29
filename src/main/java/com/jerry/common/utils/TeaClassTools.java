package com.jerry.common.utils;

import com.jerry.pojo.TeaClass;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

/**
 * @author long chen
 * @date 2018/4/3
 * @description 这是内部支持的一个工具方法，用于动态生成查询条件
 */
public class TeaClassTools {

    public static Specification<TeaClass> where(TeaClass teaClass) {
        return new Specification<TeaClass>() {
            @Override
            public Predicate toPredicate(Root<TeaClass> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if (teaClass.getTeaName() != null && !teaClass.getTeaName().equals("")) {
                    System.out.println("检索到教师姓名：" + teaClass.getTeaName());
                    predicates.add(criteriaBuilder.like(root.<String>get("teaName"), "%" + teaClass.getTeaName() + "%"));
                }
                if (teaClass.getClassName() != null && !teaClass.getClassName().equals("")) {
                    System.out.println("检索到班级名称：" + teaClass.getClassName());
                    predicates.add(criteriaBuilder.like(root.<String>get("className"), "%" + teaClass.getClassName() + "%"));
                }
                return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
            }
        };
    }

}
