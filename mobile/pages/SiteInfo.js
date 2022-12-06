import {StyleSheet, Text, View, Modal, TextInput, Button, Image, TouchableOpacity, Touchable} from 'react-native';
import { useContext, useState, useLayoutEffect } from 'react';
import { VaultContext } from "../hooks/vaultContext";
import { useQueryClient } from 'react-query';

const Password = ({ vaultId, password}) => {
    const [show, setShow] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { vaultStates, setVaultStates } = useContext(VaultContext);
    const [masterPassword, setMasterPassword] = useState('');
    const [alert, setAlert] = useState('');
    const queryClient  = useQueryClient();
    const vaultUnlocked = vaultStates[vaultId]?.unlocked;
    const vault = queryClient.getQueryData(`getVault_${vaultId}`)
    const vaultName = vault?.vault?.name;
    
    const clickHandler = () => {
        if (vaultUnlocked) {
            setShow(!show);
        } else {
            setModalVisible(true);
        }
    }

    const submitHandler = () => {
        if (masterPassword === vault?.vault?.masterPassword) {
            setVaultStates({
                ...vaultStates,
                [vaultId]: {
                    unlocked: true,
                }
            });
            setModalVisible(false);
            setShow(true);
        } else {
            setAlert('Incorrect password');
        }
    }

    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
        },
        modalView: {
            // opaque blue background
            backgroundColor: "rgba(70, 130, 180, 0.9)",
            height: 200,
            width: 200,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            borderRadius: 10,
        },
        input: {
            height: 35,
            width: 170,
            margin: 15,
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "white",
        }
    });

    return (
        <View style={{
            flexDirection: 'row',
        }}>
            <Text>{(vaultUnlocked && show) ? password : "********"}</Text>
            <Button title={(vaultUnlocked && show) ? "🕶" : "👁"} onPress={clickHandler}/>
            {modalVisible && (
                <View style={styles.centeredView}>
                    <Modal
                        visible={modalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisible(false);
                                        setAlert('');
                                        setMasterPassword('');
                                    }}>
                                        <Text style={{color: 'black', fontSize: 14, textAlign: 'right', paddingRight: 10, paddingTop: 5}}>x</Text>
                                </TouchableOpacity>
                                <Text style={{textAlign: "center", marginTop: 10}}>{`Enter master password for ${vaultName} vault.`}</Text>
                                <TextInput secureTextEntry style={styles.input} placeholder="*******" value={masterPassword} onChangeText={setMasterPassword} />
                                <View style={{alignItems: "center"}}>
                                    <TouchableOpacity style={{backgroundColor: "white", width: 100, borderRadius: 5}} onPress={submitHandler}>
                                        <Text style={{textAlign: "center", padding: 5, fontWeight: "bold"}}>Unlock</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{color: "red", paddingLeft: 16, fontWeight: "bold", marginTop: 10}}>{alert}</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    )
}
const SiteInfo = ({navigation, route}) => {
    const site = route.params.site;
    const vaultId = route.params.vaultId;
    const accounts = site.accounts;
    // console.log(route.params);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    if (route.params.fromAllPasswords) {
                        navigation.navigate('AllPasswords');
                    } else {
                        navigation.navigate('Vaults', {vault: {id: vaultId}});
                    }
                }}>
                    <Text>{"<---"}</Text>
                </TouchableOpacity>
            )
        });
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.site}>{site.name}</Text>
                <Text style={styles.url}>{site.url}</Text>
            </View>
            <View style={styles.accountInfo}>
                <Text style={{
                    fontWeight: 'bold',
                }}>Username</Text>
                <Text style={{
                    fontWeight: 'bold',
                }}>Password</Text>
            </View>
            {accounts.map((account, index) => (
                <View style={styles.accountInfo} key={index}>
                    <Text style={styles.username}>{account.username}</Text>
                    <Password vaultId={vaultId} password={account.password}/>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 20,
        paddingLeft: 13,
        paddingRight: 13
    },
    header: {
    },
    site: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 10,
        textAlign: 'left',
    },
    url: {
        fontSize: 20,
        paddingBottom: 10,
    },
    accountInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 16,
        paddingBottom: 10,
    }
});

export default SiteInfo;