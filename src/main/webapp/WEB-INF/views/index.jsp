<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${_csrf.headerName},${_csrf.parameterName},${_csrf.token}"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>shareSketchbook | main</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.4.0/main.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css">

<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/main.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/index.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/css/calendar.css" />
</head>
<body>
	<div class="container">
		<div class="wrapper">
			<div class="main-book">
				<div id="p0" class="main-book-cover move-page active-page">
					<b>Share My SKETCHBOOK !</b>
				</div>

			</div>
		</div>
	</div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/locale/ko.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.4.0/main.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.4.0/locales-all.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/lang/summernote-ko-KR.js"></script>
	
	<script src="${pageContext.request.contextPath }/resources/js/main.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/index.js"></script>
	<script type="module" src="${pageContext.request.contextPath }/resources/js/content.js"></script>

</body>
</html>