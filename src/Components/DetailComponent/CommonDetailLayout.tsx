import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import DetailHeader from './DetailHeader';
import HeaderImage from './HeaderImage';
import DetailTabs from './DetailTabs';
import AdBanner from './AdBanner';

interface Props {
  title: string;
  imageUrl?: string;
  defaultIcon: any;
  details: React.ReactNode;
  comments: React.ReactNode;
  onBack: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

const CommonDetailLayout: React.FC<Props> = ({
  title,
  imageUrl,
  defaultIcon,
  details,
  comments,
  onBack,
  onShare,
  onDelete,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <DetailHeader
        title={title}
        onBack={onBack}
        onShare={onShare}
        onDelete={onDelete}
      />

      <HeaderImage
        imageUrl={imageUrl}
        defaultIcon={defaultIcon}
      />

      <DetailTabs
        details={details}
        comments={comments}
      />

      <AdBanner />
    </SafeAreaView>
  );
};

export default CommonDetailLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
