export default function({ $auth, redirect }) {

    //check loggedIn "false"
    if(!$auth.loggedIn) {
        // console.log('haha')
        return redirect('/admin/login')
    }
    // console.log('hehe')

    //check admin role
    if($auth.strategy.name != "admin") {
        // console.log('hehe2')
        return redirect('/admin/login')
        
    } else {
        // console.log('haha2')
        return
    }

}