from firebase import firebase



firebase = firebase.FirebaseApplication("https://practice-939a7.firebaseio.com/", None)
id = "4"
data = {
    'address':'123 Warson Court',
    'city':'Chicago,IL',
    'cost':'10.00',
    'description':"cool description",
    'duration':'2',
    'image':'"https://tse4.mm.bing.net/th?id=OIP.yDTjQoVtawGHiG1DuZ5y3QHaFj&pid=Api"',
    'name':'park',
    'popularity':'334',
    'uid':'1234'
}

result = firebase.post('attractions', data)
print(result)