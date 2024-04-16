import React from 'react';
import { Button, SafeAreaView } from 'react-native';

import { KhatiSdk } from 'rn-all-nepal-payment';

const KhaltiExample = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const _onPaymentComplete = (data) => {
    setIsVisible(false);
    const str = data.nativeEvent.data;
    const resp = JSON.parse(str);
    console.log({ resp })
    
    if (resp.event === 'CLOSED') {
      // handle closed action
    } else if (resp.event === 'SUCCESS') {
      console.log({ data: resp.data })
    } else if (resp.event === 'ERROR') {
      console.log({ error: resp.data })
    }
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Pay with Khalti" onPress={() => setIsVisible(true)} />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default KhaltiExample;
