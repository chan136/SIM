package com.jerry.common.utils;

import com.jerry.pojo.TeaCourse;
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
public class TeaCourseTools {

    public static Specification<TeaCourse> where(TeaCourse teaCourse) {
        return new Specification<TeaCourse>() {
            @Override
            public Predicate toPredicate(Root<TeaCourse> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if (teaCourse.getTeaName() != null && !teaCourse.getTeaName().equals("")) {
                    System.out.println("检索到教师姓名：" + teaCourse.getTeaName());
                    predicates.add(criteriaBuilder.like(root.<String>get("teaName"), "%" + teaCourse.getTeaName() + "%"));
                }
                if (teaCourse.getCourseName() != null && !teaCourse.getCourseName().equals("")) {
                    System.out.println("检索到课程名称：" + teaCourse.getCourseName());
                    predicates.add(criteriaBuilder.like(root.<String>get("courseName"), "%" + teaCourse.getCourseName() + "%"));
                }
                return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
            }
        };
    }

}
