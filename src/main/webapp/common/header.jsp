<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="c"  uri="http://java.sun.com/jsp/jstl/core" %>
<link href="${ctx }static/css/imgs/favicon.ico" rel="shortcut icon">

<div class='top'>
	<div class='dg'></div>
	<div class='smalllogo'>
		<a href="#"><img src='${ctx }static/css/imgs/smalllogo.png' /></a>
		<c:if test="${not empty login_username}">
			<a class='home' href="${ctx }logout">退出</a>
		</c:if>
		<c:if test="${empty login_username}">
			<a class='home' href="${ctx }index">首页</a>
		</c:if>
	</div>
</div>