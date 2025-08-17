"""
模組名稱：TotpTools.py
功能說明：
    - TOTP (一次性驗證碼) 工具
    - 支援：
        1. 生成密鑰
        2. 生成 TOTP 物件
        3. 驗證一次性驗證碼
        4. 生成 QR Code Base64
"""

import pyotp
import base64
import qrcode
import io

class TotpTools:
    def __init__(self, issuer_name: str = "TicketSystem"):
        self.issuer_name = issuer_name

    def getSecret(self) -> str:
        """生成隨機 Base32 密鑰"""
        return pyotp.random_base32()

    def getTOTPObject(self, secret) -> pyotp.TOTP:
        """根據密鑰生成 TOTP 物件"""
        return pyotp.TOTP(str(secret))

    def verifyCode(self, secret, code) -> bool:
        """
        驗證一次性驗證碼
        secret：使用者密鑰
        code：使用者輸入的六位數字
        """
        try:
            totp = self.getTOTPObject(secret)
            return totp.verify(str(code))
        except Exception:
            return False

    def generateQRCodeBase64(self, username: str, secret: str) -> str:
        """
        生成 Google Authenticator QR Code 並回傳 Base64
        """
        try:
            uri = f"otpauth://totp/{self.issuer_name}:{username}?secret={secret}&issuer={self.issuer_name}"
            qr = qrcode.QRCode(version=1, box_size=10, border=2)
            qr.add_data(uri)
            qr.make(fit=True)

            img = qr.make_image(fill="black", back_color="white")
            buffered = io.BytesIO()
            img.save(buffered, format="PNG")
            return base64.b64encode(buffered.getvalue()).decode()
        except Exception:
            return ""
