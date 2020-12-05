<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${_csrf.headerName},${_csrf.parameterName},${_csrf.token}"/>
<meta name="status" content="${status }"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>shareSketchbook | sign</title>
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/main.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/sign.css" />
</head>
<body>
	<div class="container">
		<div class="wrapper">
			<form method="post" onsubmit="return formCheck();" style="width: 100%; height: 100%;">
				<input type="hidden" name="${_csrf.parameterName }" value="${_csrf.token }"/>
				<div class="key-formwork">
						<div class="item">
							<div class="formwork-prop">
								<b style="margin-bottom: 10px;"><b style="color: red;">*</b>열쇠 정보</b>
								<div class="text-form">
									<input type="text" id="userKey" name="userKey" placeholder="userKey"/>
								</div>
								<div class="duplicated-error" style="color: red;"></div>
							</div>
							<div class="formwork-prop">
								<b style="margin-bottom: 10px;"><b style="color: red;">*</b>키 주인 정보</b>
								<div class="text-form">
									<input type="text" id="name" name="name" placeholder="name"/>
								</div>
								<div class="text-form">
									<input type="text" id="nickName" name="nickName" placeholder="nickName"/>
								</div>
								<div>
									<label>남
										<input type="radio" name="gender" value="남" checked="checked" />
									</label>
									<label>여
										<input type="radio" name="gender" value="여"/>
									</label>
								</div>
								<div class="duplicated-error" style="color: red;"></div>
							</div>
						</div>
						<div class="item" id="key"></div>
						<div class="item">
							<div class="formwork-prop">
								<b style="margin-bottom: 10px;"><b style="color: red;">*</b>암호 정보</b>
								<div class="text-form">
									<input type="password" id="password" name="password" placeholder="password"/>
								</div>
								<div class="text-form">
									<input type="password" id="passwordC" name="passwordC" placeholder="confirm password"/>
								</div>
								<div class="duplicated-error" style="color: red;"></div>
							</div>
							<div class="formwork-prop">
								<button>키 생성하기</button>
								<button type="button" onclick="window.history.back();">되돌아가기</button>
							</div>
						</div>
				</div>
			</form>
		</div>
	</div>
	
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/main.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/sign.js"></script>
</body>
</html>