package com.jerry.common.utils;

import com.jerry.pojo.Student;
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
public class StudentTools {

    public static Specification<Student> where(Student student) {
        return new Specification<Student>() {
            @Override
            public Predicate toPredicate(Root<Student> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if (student.getStuName() != null && !student.getStuName().equals("")) {
                    System.out.println("检索到学生姓名：" + student.getStuName());
                    predicates.add(criteriaBuilder.like(root.<String>get("stuName"), "%" + student.getStuName() + "%"));
                }
                if (student.getStuNo() != null && !student.getStuNo().equals("")) {
                    System.out.println("检索到学生学号：" + student.getStuNo());
                    predicates.add(criteriaBuilder.equal(root.<String>get("stuNo"), student.getStuNo()));
                }
                if (student.getClassNo() != null && !student.getClassNo().equals("")) {
                    System.out.println("检索到学生学号：" + student.getClassNo());
                    predicates.add(criteriaBuilder.equal(root.<String>get("classNo"), student.getClassNo()));
                }
                if (student.getBeginTime() != null && !student.getBeginTime().equals("") && (student.getEndTime() == null || student.getEndTime().equals(""))) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.<String>get("stuSchoolTime"), student.getBeginTime()));
                }
                if ((student.getBeginTime() == null || student.getBeginTime().equals("")) && student.getEndTime() != null && !student.getEndTime().equals("")) {
                    predicates.add(criteriaBuilder.lessThanOrEqualTo(root.<String>get("stuSchoolTime"), student.getEndTime()));
                }
                if (student.getBeginTime() != null && !student.getBeginTime().equals("") && student.getEndTime() != null && !student.getEndTime().equals("")) {
                    predicates.add(criteriaBuilder.between(root.<String>get("stuSchoolTime"), student.getBeginTime(), student.getEndTime()));
                }
                return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
            }
        };
    }

}
