package com.jerry.repository;

import com.jerry.pojo.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author long chen
 * @date 2018/2/2
 * @description
 */
public interface ScoreRepository extends JpaRepository<Score, Integer>, JpaSpecificationExecutor<Score> {



}
