if (getSearchParams().error) {
    if (getSearchParams().error == "emptyinput") {
        message("please fill in all required fields", true)
    } else if (getSearchParams().error == "invalidusername") {
        message("you username can only contain letters and numbers", true)
    } else if (getSearchParams().error == "invalidemail") {
        message("please provide a valid email address", true)
    } else if (getSearchParams().error == "pwdnotmatch") {
        message("your password does not match", true)
    } else if (getSearchParams().error == "usernametaken") {
        message("that username has been taken please use another", true)
    } else if (getSearchParams().error == "syserr") {
        message("an unknown error occurred", true)
    } else if (getSearchParams().error == "hcaptchafail") {

        message("Please verify your a human", true, false)
    }
}