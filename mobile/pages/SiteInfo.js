import { StyleSheet, Text, View, Modal, TextInput, Button, Image, TouchableOpacity, Touchable, Pressable, Linking } from 'react-native';
import { useContext, useState, useLayoutEffect } from 'react';
import { VaultContext } from "../hooks/vaultContext";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

        },
        modalView: {
            width: 270,
            height: 270,
            margin: 20,
            backgroundColor: "#f0f0f0",
            borderRadius: 10,
            paddingHorizontal: 35,
            paddingTop: 17,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
        modalHeader: {
            flexDirection: "row",
            marginBottom: 10,
        },
        modalHeaderContent: {
            flexGrow: 1,
        },
        button: {
            borderRadius: 20,
            padding: 10,
            paddingHorizontal: 25,
            marginTop: 20,
            elevation: 2
        },
        buttonClose: {
            backgroundColor: "#2196F3",
        },
        textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
        },
        TextInput: {
            padding: 10,
            width: "100%",
            textAlign: "center",
            borderRadius: 5,
            backgroundColor: "#F8F9F9",
            marginBottom: 15,
            marginTop: 5,
            borderWidth: 1,
            borderColor: "#CCCCCC",
        },
    });

    return (
        <View style={{
            flexDirection: 'row',
        }}>
            <Text style={{paddingRight: 5, fontSize: 16}} >{(vaultUnlocked && show) ? password : "•••••••••"}</Text>
            <Pressable onPress={clickHandler}>
                {(vaultUnlocked && show) ? <MaterialCommunityIcons
                    name="eye-off-outline"
                    size={24}
                    color={'black'}
                />
                : <MaterialCommunityIcons
                    name="eye-outline"
                        size={24}
                        color={'black'}
                    />
                }
            </Pressable>
            {modalVisible && (
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        visible={modalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.modalHeader}>
                                    <View style={styles.modalHeaderContent}><Text></Text></View>
                                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                        <MaterialCommunityIcons
                                        name="close"
                                        size={25}
                                        color={'#000000'}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={{textAlign: "center", marginBottom: 15, fontSize: 15}}>{`Enter master password for ${vaultName} vault.`}</Text>
                                <TextInput
                                    secureTextEntry
                                    style={styles.TextInput}
                                    placeholder="Enter Password"
                                    placeholderTextColor={"#003f5c"}
                                    padding={10}
                                    value={masterPassword}
                                    onChangeText={setMasterPassword}
                                />
                                <View style={{alignItems: "center"}}>
                                    <Pressable
                                        style={({pressed}) => [styles.button, styles.buttonClose,{backgroundColor: pressed ? "#16578B" : "#2196F3"}]}
                                        onPress={submitHandler}
                                        >
                                        <Text style={styles.textStyle}>Unlock</Text>
                                    </Pressable>
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
    console.log(route.params.fromAllPasswords);

    // If site.url does not start with http:// or https://, add https:// to the beginning of the url
    const url = site.url.startsWith('http://') || site.url.startsWith('https://') ? site.url : `https://${site.url}`;

    // if site.url starts with http:// or https://, remove it from the beginning of the url
    const urlWithoutProtocol = site.url.startsWith('http://') || site.url.startsWith('https://') ? site.url.substring(site.url.indexOf('/') + 2, site.url.lastIndexOf(".") + 4) : site.url;

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: 'lightgrey',
                            alignContent: 'center',
                            paddingTop: 3,
                            width: 40,
                            borderRadius: 5,
                            height: 40,
                        }}
                            onPress={() => {
                                if (route.params.fromAllPasswords) { 
                                    navigation.navigate('AllPasswords');
                                } else {
                                    navigation.navigate('Vaults', {id: vaultId});
                                }
                            }}>
                            <MaterialCommunityIcons
                            name="chevron-left"
                            size={36}
                            color={'#5b5b5b'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 4,
                    }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            paddingBottom: 10,
                            textAlign: 'center',
                        }}>{site.name}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
                <Text style={styles.url} onPress={() => Linking.openURL(url)}>{urlWithoutProtocol}</Text>
            </View>
            <View style={styles.accountInfo}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                }}>Username</Text>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
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
        justifyContent: 'center',
        fontWeight: 'bold',
        paddingBottom: 10,
        textAlign: 'left',
    },
    url: {
        fontSize: 20,
        paddingBottom: 10,
        textAlign: 'center',
        marginBottom: 20,
    },
    accountInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 16,
        paddingBottom: 10,
    },
    username: { 
        fontSize: 16,
    },
    modalView: {
        width: 270,
        height: 270,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 35,
        paddingTop: 17,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default SiteInfo;