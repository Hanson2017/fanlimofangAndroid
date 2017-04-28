package org.zywx.wbpalmstar.widgetone.uex11575732.wxapi; // net.sourceforge.simcpux处为你的包名 
 
import android.app.Activity;
import android.os.Bundle;

import cn.reactnative.modules.wx.WeChatModule;

public class WXEntryActivity extends Activity{
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}