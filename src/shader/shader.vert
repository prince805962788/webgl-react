attribute vec4 a_Position;
attribute float a_PointSize;
void main(){
    //点位
    gl_Position=a_Position;
    //尺寸
    gl_PointSize = a_PointSize;
}