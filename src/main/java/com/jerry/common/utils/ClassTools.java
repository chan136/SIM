package com.jerry.common.utils;

import com.jerry.pojo.Class;
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
public class ClassTools {

    public static Specification<Class> where(Class classes) {
        return new Specification<Class>() {
            @Override
            public Predicate toPredicate(Root<Class> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if (classes.getClassNo() != null && !classes.getClassNo().equals("")) {
                    System.out.println("检索到班级编号：" + classes.getClassNo());
                    predicates.add(criteriaBuilder.like(root.<String>get("classNo"), "%" + classes.getClassNo() + "%"));
                }
                if (classes.getClassName() != null && !classes.getClassName().equals("")) {
                    System.out.println("检索到班级名称：" + classes.getClassName());
                    predicates.add(criteriaBuilder.like(root.<String>get("className"), "%" + classes.getClassName() + "%"));
                }
                if (classes.getCollege() != null && !classes.getCollege().equals("")) {
                    System.out.println("检索到学院：" + classes.getCollege());
                    predicates.add(criteriaBuilder.like(root.<String>get("college"), "%" + classes.getCollege() + "%"));
                }
                if (classes.getMajor() != null && !classes.getMajor().equals("")) {
                    System.out.println("检索到专业：" + classes.getMajor());
                    predicates.add(criteriaBuilder.like(root.<String>get("major"), "%" + classes.getMajor() + "%"));
                }
                return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
            }
        };
    }

}
