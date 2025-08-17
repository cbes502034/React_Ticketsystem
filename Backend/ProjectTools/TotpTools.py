import pyotp
import qrcode
import io
import base64

def GetSecret(request):
    secret = pyotp.random_base32()
    request.session["secret"] = secret
    return secret

def GetTOTPObject(secret):
    totpobject = pyotp.TOTP(secret)
    return totpobject

def GetURI(totpobject,email):
    uri = totpobject.provisioning_uri(name=email, issuer_name="GJun訂票平台")
    return uri

def getQRcodeSrc(uri):
    imgio = io.BytesIO()
    img = qrcode.make(uri)
    img.save(imgio, format='PNG')
    imgio.seek(0)
    base64img = base64.b64encode(imgio.read()).decode('utf-8')
    qrcodesrc = f"data:image/png;base64,{base64img}"
    return qrcodesrc