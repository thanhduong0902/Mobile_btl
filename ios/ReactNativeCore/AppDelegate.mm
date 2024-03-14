#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTAppSetupUtils.h>
#import "RNSplashScreen.h"
#import <Firebase.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <TwitterKit/TWTRKit.h>
#import <GoogleMaps/GoogleMaps.h>
#import <React/RCTLinkingManager.h>
#import "Orientation.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"ReactNativeCore";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [FIRApp configure];
  [GMSServices provideAPIKey:@"AIzaSyBSRZEsRnGJkOeCiqbJmVS4kbqhgoY5ZRY"];
  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNSplashScreen show];

  return didFinish;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
