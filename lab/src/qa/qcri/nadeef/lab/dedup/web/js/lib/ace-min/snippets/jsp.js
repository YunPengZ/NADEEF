/*
 * QCRI, NADEEF LICENSE
 * NADEEF is an extensible, generalized and easy-to-deploy data cleaning platform built at QCRI.
 * NADEEF means "Clean" in Arabic
 *
 * Copyright (c) 2011-2013, Qatar Foundation for Education, Science and Community Development (on
 * behalf of Qatar Computing Research Institute) having its principle place of business in Doha,
 * Qatar with the registered address P.O box 5825 Doha, Qatar (hereinafter referred to as "QCRI")
 *
 * NADEEF has patent pending nevertheless the following is granted.
 * NADEEF is released under the terms of the MIT License, (http://opensource.org/licenses/MIT).
 */

ace.define("ace/snippets/jsp",["require","exports","module"],function(e,t,n){t.snippetText='snippet @page\n	<%@page contentType="text/html" pageEncoding="UTF-8"%>\nsnippet jstl\n	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>\n	<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>\nsnippet jstl:c\n	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>\nsnippet jstl:fn\n	<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>\nsnippet cpath\n	${pageContext.request.contextPath}\nsnippet cout\n	<c:out value="${1}" default="${2}" />\nsnippet cset\n	<c:set var="${1}" value="${2}" />\nsnippet cremove\n	<c:remove var="${1}" scope="${2:page}" />\nsnippet ccatch\n	<c:catch var="${1}" />\nsnippet cif\n	<c:if test="${${1}}">\n		${2}\n	</c:if>\nsnippet cchoose\n	<c:choose>\n		${1}\n	</c:choose>\nsnippet cwhen\n	<c:when test="${${1}}">\n		${2}\n	</c:when>\nsnippet cother\n	<c:otherwise>\n		${1}\n	</c:otherwise>\nsnippet cfore\n	<c:forEach items="${${1}}" var="${2}" varStatus="${3}">\n		${4:<c:out value="$2" />}\n	</c:forEach>\nsnippet cfort\n	<c:set var="${1}">${2:item1,item2,item3}</c:set>\n	<c:forTokens var="${3}" items="${$1}" delims="${4:,}">\n		${5:<c:out value="$3" />}\n	</c:forTokens>\nsnippet cparam\n	<c:param name="${1}" value="${2}" />\nsnippet cparam+\n	<c:param name="${1}" value="${2}" />\n	cparam+${3}\nsnippet cimport\n	<c:import url="${1}" />\nsnippet cimport+\n	<c:import url="${1}">\n		<c:param name="${2}" value="${3}" />\n		cparam+${4}\n	</c:import>\nsnippet curl\n	<c:url value="${1}" var="${2}" />\n	<a href="${$2}">${3}</a>\nsnippet curl+\n	<c:url value="${1}" var="${2}">\n		<c:param name="${4}" value="${5}" />\n		cparam+${6}\n	</c:url>\n	<a href="${$2}">${3}</a>\nsnippet credirect\n	<c:redirect url="${1}" />\nsnippet contains\n	${fn:contains(${1:string}, ${2:substr})}\nsnippet contains:i\n	${fn:containsIgnoreCase(${1:string}, ${2:substr})}\nsnippet endswith\n	${fn:endsWith(${1:string}, ${2:suffix})}\nsnippet escape\n	${fn:escapeXml(${1:string})}\nsnippet indexof\n	${fn:indexOf(${1:string}, ${2:substr})}\nsnippet join\n	${fn:join(${1:collection}, ${2:delims})}\nsnippet length\n	${fn:length(${1:collection_or_string})}\nsnippet replace\n	${fn:replace(${1:string}, ${2:substr}, ${3:replace})}\nsnippet split\n	${fn:split(${1:string}, ${2:delims})}\nsnippet startswith\n	${fn:startsWith(${1:string}, ${2:prefix})}\nsnippet substr\n	${fn:substring(${1:string}, ${2:begin}, ${3:end})}\nsnippet substr:a\n	${fn:substringAfter(${1:string}, ${2:substr})}\nsnippet substr:b\n	${fn:substringBefore(${1:string}, ${2:substr})}\nsnippet lc\n	${fn:toLowerCase(${1:string})}\nsnippet uc\n	${fn:toUpperCase(${1:string})}\nsnippet trim\n	${fn:trim(${1:string})}\n',t.scope="jsp"})