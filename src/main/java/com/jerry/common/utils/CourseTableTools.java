package com.jerry.common.utils;

import com.jerry.pojo.CourseTable;
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
public class CourseTableTools {

    public static Specification<CourseTable> where(CourseTable table) {
        return new Specification<CourseTable>() {
            @Override
            public Predicate toPredicate(Root<CourseTable> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if (table.getCollege() != null && !table.getCollege().equals("")) {
                    System.out.println("检索到学院：" + table.getCollege());
                    predicates.add(criteriaBuilder.like(root.<String>get("college"), "%" + table.getCollege() + "%"));
                }
                if (table.getMajor() != null && !table.getMajor().equals("")) {
                    System.out.println("检索到专业：" + table.getMajor());
                    predicates.add(criteriaBuilder.like(root.<String>get("major"), "%" + table.getMajor() + "%"));
                }
                if (table.getClassNo() != null && !table.getClassNo().equals("")) {
                    System.out.println("检索到班级编号：" + table.getClassNo());
                    predicates.add(criteriaBuilder.like(root.<String>get("classNo"), "%" + table.getClassNo() + "%"));
                }
                if (table.getSchoolYear() != null && !table.getSchoolYear().equals("")) {
                    System.out.println("检索到学年：" + table.getSchoolYear());
                    predicates.add(criteriaBuilder.like(root.<String>get("schoolYear"), "%" + table.getSchoolYear() + "%"));
                }
                if (table.getSchoolTerm() != null && !table.getSchoolTerm().equals("")) {
                    System.out.println("检索到学期：" + table.getSchoolTerm());
                    predicates.add(criteriaBuilder.like(root.<String>get("schoolTerm"), "%" + table.getSchoolTerm() + "%"));
                }
                return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
            }
        };
    }

}
