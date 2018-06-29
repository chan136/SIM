package com.jerry.pojo;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/4/24
 * @description
 */
@Entity
@Data
@Table(name = "status")
public class Status implements Serializable {
    private static final long serialVersionUID = -1462263229722272521L;

    @Id
    @Column(length = 20)
    private String name;

    @Column(length = 20)
    private String status;

    public Status() {
    }

    public Status(String name, String status) {
        this.name = name;
        this.status = status;
    }
}
