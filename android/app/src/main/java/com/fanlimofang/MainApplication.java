package org.zywx.wbpalmstar.widgetone.uex11575732;

import com.oblador.vectoricons.VectorIconsPackage;
import cn.reactnative.modules.qq.QQPackage;
import cn.reactnative.modules.wx.WeChatPackage;
import com.imagepicker.ImagePickerPackage; // <-- add this import
import android.app.Application;

// MTA
import com.tencent.stat.StatConfig;
import com.tencent.stat.StatService;

// 极光推送
import cn.jpush.android.api.JPushInterface;
import cn.jpush.reactnativejpush.JPushPackage;

import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private boolean SHUTDOWN_TOAST = false;
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
          new VectorIconsPackage(),
          new QQPackage(),
          new WeChatPackage(),
          new ImagePickerPackage(),
          new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG) 
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    // MTA
    StatService.trackCustomEvent(this, "onCreate", "");

    // 极光推送
     JPushInterface.init(this);
  }
 
}
