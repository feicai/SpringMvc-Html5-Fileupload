<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/common/include_tag.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>首页</title>
<%@include file="/common/page_head.jsp"%>
<script type="text/javascript" src="${basePath }static/js/spark-md5.min.js"></script>
<script type="text/javascript" src="${basePath }static/js/html5-fileupload.js"></script>
<script type="text/javascript">
$(function() {
	
});
</script>
</head>
<body>
	<form action="${basePath}doFileupload" method="post" enctype="multipart/form-data">
	请选择文件：<input type="file" id="myFile" name="myFile" onchange="getFileInfo()"><span id="fileSize"></span><br />
	<input type="button" value="上传" onclick="fileupload()"><br />
	<div id="box"></div>
	</form>
</body>
</html>