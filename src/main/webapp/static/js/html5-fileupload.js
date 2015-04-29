var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice ;
var file = null;	//文件
var fileMd5 = null;	//文件Md5值
var flag = false;	//是否完成文件Md5计算
function submit(){
	if(file == null){
		return;
	}
	if(flag){
		fileupload();
	}else{
		setTimeout(submit,1000)
	}
}

//上传文件
function fileupload(){
	var formData = new FormData()
	var fileName = fileMd5+getExtension(file.name)
	formData.append("fileName",fileName);
	var remoteFileSize = getRemoteFileSize(fileName)
	var packet = file.slice(remoteFileSize, file.size);
	formData.append("myFile", packet);
	var xhr = new XMLHttpRequest();
	var url = "${basePath}doFileupload" // 文件上传的地址 可以包括文件的参数 如文件名称 分块数等以便后台处理
	xhr.open('POST', url, true);
	xhr.onload = function (e){
	     // 判断文件是否上传成功，如果成功继续上传下一块，如果失败重试该快
	}
	xhr.upload.onprogress = function(e){
	     // 选用 如果文件分块大小较大 可以通过该方法判断单片文件具体的上传进度
	     // e.loaded  该片文件上传了多少
	     // e.totalSize 该片文件的总共大小,火狐无此参数
		 console.log("上传进度",e.loaded+"/"+file.size + " = " + Math.round(e.loaded*100/file.size));
	}
	xhr.send(formData);
}

function getFileInfo(){
	file = document.getElementById("myFile").files[0];
	var fileSize = (file.size/1024).toFixed(2);
	if(fileSize >= 1024){
		fileSize = (fileSize/1024).toFixed(2)+"M";
	}else{
		fileSize = fileSize+"K";
	}
	fileMd5 = getFileMd5();
	$("#fileSize").html('文件大小:' + fileSize+"  文件类型"+file.type);
}

//得到文件后缀
function getExtension(fileName){
	if(fileName == null) return null;
	var pos = str.lastIndexOf('.');
	if(pos <0){
		return null;
	}
	return fileName.substring(pos+1,fileName.length);
}
//得到文件MD5值
function getFileMd5() {
	flag = false;
    //声明必要的变量
    var fileReader = new FileReader();
    //文件分割方法（注意兼容性）
   	var chunkSize = 4194304,    //文件每块分割2M，计算分割详情            
    chunks = Math.ceil(file.size / chunkSize), 
    currentChunk = 0, 

    //创建md5对象（基于SparkMD5）
    spark = new SparkMD5();

    //每块文件读取完毕之后的处理
    fileReader.onload = function(e) {
        //console.log("读取文件", currentChunk + 1, "/", chunks);
        //每块交由sparkMD5进行计算
        spark.appendBinary(e.target.result);
        currentChunk++;

        //如果文件处理完成计算MD5，如果还有分片继续处理
        if (currentChunk < chunks) {
            loadNext();
        } else {
           $("#box").html('MD5 hash:' + spark.end());
           fileMd5 = spark.end();
           flag = true;
           return spark.end()
        }
    };

     //处理单片文件的上传
     function loadNext() {
         var start = currentChunk * chunkSize, end = start + chunkSize >= file.size ? file.size : start + chunkSize;
         fileReader.readAsBinaryString(blobSlice.call(file, start, end));
     }

     loadNext();
};

//得到服务器端文件的长度
function getRemoteFileSize(fileName){
	var remoteFileSize = 0;
	$.ajax({
		url : "${basePath }getLocalFileSize",
		data : {fileName : fileName},
		async : false,
		success : function(data){
			remoteFileSize = data;
		}
	})
	return remoteFileSize;
}