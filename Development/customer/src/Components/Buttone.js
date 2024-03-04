import React from 'react';
import { Button } from 'native-base';

function Buttone({ mt, bg, color, children, onPress }) {
    return (
        <Button w="full" h={55} mt={mt} rounded="full" bg={bg}
            _text={{
                color: color,
                fontSize: "16",
                fontWeight: "bold",
            }}>
            {children}
        </Button>
    );
}

export default Buttone;
