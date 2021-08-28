
## JS thread と UI thread
UI thireadは60frames/1秒 で動いており、JS threadとは非同期でやり取りしている  
このとき、UI threadからanimationに関するframeの要求がJS threadに送られ、それをresponse するという動作が16.6(=1/60)ミリ秒に完結せず、frame dropがおきてアニメーションがぎこちなくなってしますことがある(UXが低下してしまう)。  
=> 全てのgestureとanimataionをUI側で宣言して、２つのthreadでのやり取りをしなくてよいようにする  
  つまり、animationのeventが生じるだけではUI threadとJS threadはcommunicationしない
  (react-native-reanimatedとreact-native-gesture-handlerから提供されるapiは全てUI threadで実行される)

## つまづきそうな用語やapiの解説
<dl>
<dt> useSharedValue</dt>  
<dd>UI thread と JS thread でshareできる値を提供するapi  
js thread(react native)から由来するアニメーションを可能にする
</dd>

<dt> worklet</dt>  
<dd>関数にこのディレクティブを指定すると その関数がコンパイルされてUI thireadに送られ、UI thiread側で実行できるようになる</dd>


<dt>interpolate (補間)</dt>
<dd>shared valueをアニメーションしやすい値に補間するためのapi  
e.g. shared valueが0から1にアニメーションし、interpolateによって0から360に補間してrotateの角度をアニメーションさせる  
他にも rgba表記のcolorなどもアニメーションせさられる。</dd>
</dl>



## 参考

worklet :  https://www.youtube.com/watch?v=6dDpggVnZPo

william's tutorial at freeCodeCamp.org   :  https://www.youtube.com/watch?v=wEVjaXK4sYQ

https://chrizog.com/react-native-rotation-anchor-point

