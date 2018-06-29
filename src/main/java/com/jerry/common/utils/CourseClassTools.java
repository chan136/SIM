package com.jerry.common.utils;

import com.jerry.pojo.CourseClass;
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
public class CourseClassTools {

    public static Specification<CourseClass> where(CourseClass courseClass) {
        return new Specification<CourseClass>() {
            @Override
            public Predicate toPredicate(Root<CourseClass> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if (courseClass.getCourseNo() != null && !courseClass.getCourseNo().equals("")) {
                    System.out.println("检索到课程编号：" + courseClass.getCourseNo());
                    predicates.add(criteriaBuilder.like(root.<String>get("courseNo"), courseClass.getCourseNo() + "%"));
                }
                if (courseClass.getCourseName() != null && !courseClass.getCourseName().equals("")) {
                    System.out.println("检索到课程名称：" + courseClass.getCourseName());
                    predicates.add(criteriaBuilder.like(root.<String>get("courseName"), "%" + courseClass.getCourseName() + "%"));
                }
                if (courseClass.getClassNo() != null && !courseClass.getClassNo().equals("")) {
                    System.out.println("检索到班级编号：" + courseClass.getClassNo());
                    predicates.add(criteriaBuilder.like(root.<String>get("classNo"), courseClass.getClassNo() + "%"));
                }
                if (courseClass.getClassName() != null && !courseClass.getClassName().equals("")) {
                    System.out.println("检索到班级名称：" + courseClass.getClassName());
                    predicates.add(criteriaBuilder.like(root.<String>get("className"), "%" + courseClass.getClassName() + "%"));
                }
                return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
            }
        };
    }

}
