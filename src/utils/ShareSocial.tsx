import Share from "react-native-share";

export const FaceBookShare = (url: string): void => {
  const shareOptions = {
    url: url,
    social: Share.Social.FACEBOOK,
  };

  Share.shareSingle(shareOptions);
};

export const TwitterShare = (url: string): void => {
  const shareOptions = {
    url: url,
    social: Share.Social.TWITTER,
  };

  Share.shareSingle(shareOptions);
};

export const GoogleShare = (url: string): void => {
  const shareOptions = {
    url: url,
    social: Share.Social.EMAIL,
  };

  Share.shareSingle(shareOptions);
};
export const MessengerShare = (url: string): void => {
  const shareOptions = {
    url: url,
    social: Share.Social.MESSENGER,
  };

  Share.shareSingle(shareOptions);
};

export const LinkedinShare = (url: string): void => {
  const shareOptions = {
    url: url,
    social: Share.Social.LINKEDIN,
  };

  Share.shareSingle(shareOptions);
};
