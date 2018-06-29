package com.jerry.common.utils;

import com.jerry.pojo.Course;
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
public class CourseTools {

    public static Specification<Course> where(Course course) {
        return new Specification<Course>() {
            @Override
            public Predicate toPredicate(Root<Course> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if (course.getSchoolYear() != null && !course.getSchoolYear().equals("")) {
                    System.out.println("检索到学年：" + course.getSchoolYear());
                    predicates.add(criteriaBuilder.equal(root.<String>get("schoolYear"), course.getSchoolYear()));
                }
                if (course.getSchoolTerm() != null && !course.getSchoolTerm().equals("")) {
                    System.out.println("检索到学期：" + course.getSchoolTerm());
                    predicates.add(criteriaBuilder.equal(root.<String>get("schoolTerm"), course.getSchoolTerm()));
                }
                if (course.getCourseNo() != null && !course.getCourseNo().equals("")) {
                    System.out.println("检索到课程编号：" + course.getCourseNo());
                    predicates.add(criteriaBuilder.like(root.<String>get("courseNo"), course.getCourseNo() + "%"));
                }
                if (course.getCourseName() != null && !course.getCourseName().equals("")) {
                    System.out.println("检索到课程名称：" + course.getCourseName());
                    predicates.add(criteriaBuilder.like(root.<String>get("courseName"), "%" + course.getCourseName() + "%"));
                }
                if (course.getCourseKind() != null && !course.getCourseKind().equals("")) {
                    System.out.println("检索到课程性质：" + course.getCourseKind());
                    predicates.add(criteriaBuilder.like(root.<String>get("courseKind"), "%" + course.getCourseKind() + "%"));
                }
                return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
            }
        };
    }

}
