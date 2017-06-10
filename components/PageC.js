import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {
    Actions,
    ActionConst,
} from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 32,
        color: 'rgb(95, 177, 237)',
    },
});

const PageC = () => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => { Actions.tabbar({ type: ActionConst.PUSH_OR_POP }); }}>
            <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
    </View>
);
export default PageC;
