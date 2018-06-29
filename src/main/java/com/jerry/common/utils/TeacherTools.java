package com.jerry.common.utils;

import com.jerry.pojo.Teacher;
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
public class TeacherTools {

    public static Specification<Teacher> where(Teacher teacher) {
        return new Specification<Teacher>() {
            @Override
            public Predicate toPredicate(Root<Teacher> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if (teacher.getTeaName() != null && !teacher.getTeaName().equals("")) {
                    System.out.println("检索到教师姓名：" + teacher.getTeaName());
                    predicates.add(criteriaBuilder.like(root.<String>get("teaName"), "%" + teacher.getTeaName() + "%"));
                }
                if (teacher.getTeaNo() != null && !teacher.getTeaNo().equals("")) {
                    System.out.println("检索到教师编号：" + teacher.getTeaNo());
                    predicates.add(criteriaBuilder.equal(root.<Integer>get("teaNo"), teacher.getTeaNo()));
                }
                if (teacher.getTeaTitle() != null && !teacher.getTeaTitle().equals("")) {
                    System.out.println("检索到教师职称：" + teacher.getTeaTitle());
                    predicates.add(criteriaBuilder.equal(root.<Integer>get("teaTitle"), teacher.getTeaTitle()));
                }
                if (teacher.getCollege() != null && !teacher.getCollege().equals("")) {
                    System.out.println("检索到教师学院：" + teacher.getCollege());
                    predicates.add(criteriaBuilder.equal(root.<Integer>get("college"), teacher.getCollege()));
                }
                return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
            }
        };
    }

}
