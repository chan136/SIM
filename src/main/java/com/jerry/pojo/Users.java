package com.jerry.pojo;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author long chen
 * @date 2018/3/26
 * @description 用户
 */
@Entity
@Data
@Table(name = "USERS")
public class Users implements Serializable{

	private static final long serialVersionUID = 7750235405006762224L;

	@Id
	@Column(length = 20)
	private String username;
	@Column(length = 50)
	private String password;
	@Column(length = 10)
	private String permission;

	public Users() {
	}

	public Users(String username, String password, String permission) {
		this.username = username;
		this.password = password;
		this.permission = permission;
	}
}
