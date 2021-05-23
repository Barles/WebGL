export default `
attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix;

uniform highp vec3 uAmbientColor;
uniform highp vec3 uDirectionalLightColor;
uniform highp vec3 uDirectionalLightDirection;

varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vTextureCoord = aTextureCoord;

  highp vec3 directionalLightColor = uDirectionalLightColor;
  highp vec3 directionalLightDirection = normalize(uDirectionalLightDirection);

  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

  highp float directional = max(dot(transformedNormal.xyz, directionalLightDirection), 0.0);
  vLighting = uAmbientColor + (directionalLightColor * directional);
}
`
