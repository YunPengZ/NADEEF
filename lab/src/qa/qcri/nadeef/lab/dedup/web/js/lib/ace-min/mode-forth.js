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

ace.define("ace/mode/forth",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/forth_highlight_rules","ace/mode/folding/cstyle"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./forth_highlight_rules").ForthHighlightRules,u=e("./folding/cstyle").FoldMode,a=function(){this.HighlightRules=o,this.foldingRules=new u};r.inherits(a,i),function(){this.lineCommentStart="(?<=^|\\s)\\.?\\( [^)]*\\)",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/forth"}.call(a.prototype),t.Mode=a}),ace.define("ace/mode/forth_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{include:"#forth"}],"#comment":[{token:"comment.line.double-dash.forth",regex:"(?:^|\\s)--\\s.*$",comment:"line comments for iForth"},{token:"comment.line.backslash.forth",regex:"(?:^|\\s)\\\\[\\s\\S]*$",comment:"ANSI line comment"},{token:"comment.line.backslash-g.forth",regex:"(?:^|\\s)\\\\[Gg] .*$",comment:"gForth line comment"},{token:"comment.block.forth",regex:"(?:^|\\s)\\(\\*(?=\\s|$)",push:[{token:"comment.block.forth",regex:"(?:^|\\s)\\*\\)(?=\\s|$)",next:"pop"},{defaultToken:"comment.block.forth"}],comment:"multiline comments for iForth"},{token:"comment.block.documentation.forth",regex:"\\bDOC\\b",caseInsensitive:!0,push:[{token:"comment.block.documentation.forth",regex:"\\bENDDOC\\b",caseInsensitive:!0,next:"pop"},{defaultToken:"comment.block.documentation.forth"}],comment:"documentation comments for iForth"},{token:"comment.line.parentheses.forth",regex:"(?:^|\\s)\\.?\\( [^)]*\\)",comment:"ANSI line comment"}],"#constant":[{token:"constant.language.forth",regex:"(?:^|\\s)(?:TRUE|FALSE|BL|PI|CELL|C/L|R/O|W/O|R/W)(?=\\s|$)",caseInsensitive:!0},{token:"constant.numeric.forth",regex:"(?:^|\\s)[$#%]?[-+]?[0-9]+(?:\\.[0-9]*e-?[0-9]+|\\.?[0-9a-fA-F]*)(?=\\s|$)"},{token:"constant.character.forth",regex:"(?:^|\\s)(?:[&^]\\S|(?:\"|')\\S(?:\"|'))(?=\\s|$)"}],"#forth":[{include:"#constant"},{include:"#comment"},{include:"#string"},{include:"#word"},{include:"#variable"},{include:"#storage"},{include:"#word-def"}],"#storage":[{token:"storage.type.forth",regex:"(?:^|\\s)(?:2CONSTANT|2VARIABLE|ALIAS|CONSTANT|CREATE-INTERPRET/COMPILE[:]?|CREATE|DEFER|FCONSTANT|FIELD|FVARIABLE|USER|VALUE|VARIABLE|VOCABULARY)(?=\\s|$)",caseInsensitive:!0}],"#string":[{token:"string.quoted.double.forth",regex:'(ABORT" |BREAK" |\\." |C" |0"|S\\\\?" )([^"]+")',caseInsensitive:!0},{token:"string.unquoted.forth",regex:"(?:INCLUDE|NEEDS|REQUIRE|USE)[ ]\\S+(?=\\s|$)",caseInsensitive:!0}],"#variable":[{token:"variable.language.forth",regex:"\\b(?:I|J)\\b",caseInsensitive:!0}],"#word":[{token:"keyword.control.immediate.forth",regex:"(?:^|\\s)\\[(?:\\?DO|\\+LOOP|AGAIN|BEGIN|DEFINED|DO|ELSE|ENDIF|FOR|IF|IFDEF|IFUNDEF|LOOP|NEXT|REPEAT|THEN|UNTIL|WHILE)\\](?=\\s|$)",caseInsensitive:!0},{token:"keyword.other.immediate.forth",regex:"(?:^|\\s)(?:COMPILE-ONLY|IMMEDIATE|IS|RESTRICT|TO|WHAT'S|])(?=\\s|$)",caseInsensitive:!0},{token:"keyword.control.compile-only.forth",regex:'(?:^|\\s)(?:-DO|\\-LOOP|\\?DO|\\?LEAVE|\\+DO|\\+LOOP|ABORT\\"|AGAIN|AHEAD|BEGIN|CASE|DO|ELSE|ENDCASE|ENDIF|ENDOF|ENDTRY\\-IFERROR|ENDTRY|FOR|IF|IFERROR|LEAVE|LOOP|NEXT|RECOVER|REPEAT|RESTORE|THEN|TRY|U\\-DO|U\\+DO|UNTIL|WHILE)(?=\\s|$)',caseInsensitive:!0},{token:"keyword.other.compile-only.forth",regex:"(?:^|\\s)(?:\\?DUP-0=-IF|\\?DUP-IF|\\)|\\[|\\['\\]|\\[CHAR\\]|\\[COMPILE\\]|\\[IS\\]|\\[TO\\]|<COMPILATION|<INTERPRETATION|ASSERT\\(|ASSERT0\\(|ASSERT1\\(|ASSERT2\\(|ASSERT3\\(|COMPILATION>|DEFERS|DOES>|INTERPRETATION>|OF|POSTPONE)(?=\\s|$)",caseInsensitive:!0},{token:"keyword.other.non-immediate.forth",regex:"(?:^|\\s)(?:'|<IS>|<TO>|CHAR|END-STRUCT|INCLUDE[D]?|LOAD|NEEDS|REQUIRE[D]?|REVISION|SEE|STRUCT|THRU|USE)(?=\\s|$)",caseInsensitive:!0},{token:"keyword.other.warning.forth",regex:'(?:^|\\s)(?:~~|BREAK:|BREAK"|DBG)(?=\\s|$)',caseInsensitive:!0}],"#word-def":[{token:["keyword.other.compile-only.forth","keyword.other.compile-only.forth","meta.block.forth","entity.name.function.forth"],regex:"(:NONAME)|(^:|\\s:)(\\s)(\\S+)(?=\\s|$)",caseInsensitive:!0,push:[{token:"keyword.other.compile-only.forth",regex:";(?:CODE)?",caseInsensitive:!0,next:"pop"},{include:"#constant"},{include:"#comment"},{include:"#string"},{include:"#word"},{include:"#variable"},{include:"#storage"},{defaultToken:"meta.block.forth"}]}]},this.normalizeRules()};s.metaData={fileTypes:["frt","fs","ldr"],foldingStartMarker:"/\\*\\*|\\{\\s*$",foldingStopMarker:"\\*\\*/|^\\s*\\}",keyEquivalent:"^~F",name:"Forth",scopeName:"source.forth"},r.inherits(s,i),t.ForthHighlightRules=s}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t,n){var r=e("../../lib/oop"),i=e("../../range").Range,s=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(o,s),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n),s=i.match(this.foldingStartMarker);if(s){var o=s.index;if(s[1])return this.openingBracketBlock(e,s[1],n,o);var u=e.getCommentFoldRange(n,o+s[0].length,1);return u&&!u.isMultiLine()&&(r?u=this.getSectionRange(e,n):t!="all"&&(u=null)),u}if(t==="markbegin")return;var s=i.match(this.foldingStopMarker);if(s){var o=s.index+s[0].length;return s[1]?this.closingBracketBlock(e,s[1],n,o):e.getCommentFoldRange(n,o,-1)}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),s=t,o=n.length;t+=1;var u=t,a=e.getLength();while(++t<a){n=e.getLine(t);var f=n.search(/\S/);if(f===-1)continue;if(r>f)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=s)break;if(l.isMultiLine())t=l.end.row;else if(r==f)break}u=t}return new i(s,o,u,e.getLine(u).length)}}.call(o.prototype)})