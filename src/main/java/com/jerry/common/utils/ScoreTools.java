package com.jerry.common.utils;

import com.jerry.pojo.Score;
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
public class ScoreTools {

    public static Specification<Score> where(Score score) {
        return new Specification<Score>() {
            @Override
            public Predicate toPredicate(Root<Score> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>();
                if (score.getStuNo() != null && !score.getStuNo().equals("")) {
                    System.out.println("检索到学生学号：" + score.getStuNo());
                    predicates.add(criteriaBuilder.like(root.<String>get("stuNo"), score.getStuNo() + "%"));
                }
                if (score.getStuName() != null && !score.getStuName().equals("")) {
                    System.out.println("检索到学生姓名：" + score.getStuName());
                    predicates.add(criteriaBuilder.like(root.<String>get("stuName"), "%" + score.getStuName() + "%"));
                }
                if (score.getCourseNo() != null && !score.getCourseNo().equals("")) {
                    System.out.println("检索到课程编号：" + score.getCourseNo());
                    predicates.add(criteriaBuilder.like(root.<String>get("courseNo"), score.getCourseNo() + "%"));
                }
                if (score.getCourseName() != null && !score.getCourseName().equals("")) {
                    System.out.println("检索到课程名称：" + score.getCourseName());
                    predicates.add(criteriaBuilder.like(root.<String>get("courseName"), "%" + score.getCourseName() + "%"));
                }
                return criteriaQuery.where(predicates.toArray(new Predicate[predicates.size()])).getRestriction();
            }
        };
    }

}
