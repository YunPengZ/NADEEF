/**
 * Autogenerated by Thrift Compiler (0.9.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package qa.qcri.nadeef.service.thrift;


public enum TJobStatusType implements org.apache.thrift.TEnum {
  WAITING(0),
  RUNNING(1),
  NOTAVAILABLE(2);

  private final int value;

  private TJobStatusType(int value) {
    this.value = value;
  }

  /**
   * Get the integer value of this enum value, as defined in the Thrift IDL.
   */
  public int getValue() {
    return value;
  }

  /**
   * Find a the enum type by its integer value, as defined in the Thrift IDL.
   * @return null if the value is not found.
   */
  public static TJobStatusType findByValue(int value) { 
    switch (value) {
      case 0:
        return WAITING;
      case 1:
        return RUNNING;
      case 2:
        return NOTAVAILABLE;
      default:
        return null;
    }
  }
}
